import { DashboardProps } from "../common/dashboard-props";
import React, { useState, SetStateAction, Dispatch } from "react";
import { useAsyncEffect } from "use-async-effect";
import { Auth, Storage } from "aws-amplify";
import { callGraphQLWithSimpleInput } from "../common/common-types";
import { listIngestedImages } from "../src/graphql/queries";
import { ListIngestedImagesQuery, IngestedImage } from "../src/API";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { ArrowRightSquareFill, ArrowLeftSquareFill, Clipboard } from 'react-bootstrap-icons';
import axios from 'axios';

interface BrowseImagesProps {
    images: IngestedImage[] | null,
    token: string,
    fetchState: string,
}

interface ImageRowProps {
    images: IngestedImage[] | null,
    index: number,
}

async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);

    console.log("copied");
}


async function copyImage(imageUrl: string) {

    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'blob', // Important
    });

    var reader = new FileReader();
    reader.readAsDataURL(response.data);
    reader.onloadend = function () {
        var base64String = reader.result;
        copyToClipboard(base64String as string);
        // data:binary/octet-stream;base64,
    }
}

async function clickPrev(event: any, state: BrowseImagesProps, setImageState: Dispatch<SetStateAction<BrowseImagesProps>>) {

    var startStr = 'z';
    if(state.images && state.images.length > 0) {
        startStr = state.images[0].image;
    }
    const props = await fetchImageSummary(startStr, true, "DESC");
    var sortedImages = [] as IngestedImage[];
    if(props?.images && props.images.length > 0) {
        // need to re-sort in asc
        sortedImages = props?.images?.sort((a, b) => a.image < b.image ? -1 : a.image > b.image ? 1 : 0);
        setImageState({ images: sortedImages, token: props.token, fetchState: 'clickPrev' });
    }
}

async function clickNext(event: any, state: BrowseImagesProps, setImageState: Dispatch<SetStateAction<BrowseImagesProps>>) {

    var startStr = '0';
    if(state.images && state.images.length > 0) {
        startStr = state.images[state.images.length - 1].image;
    }
    const props = await fetchImageSummary(startStr, false);
    if(props?.images && props.images.length > 0) {
        setImageState({ images: props.images, token: props.token, fetchState: 'clickNext' });
    }
}

async function fetchImageSummary(start: string, lessThan: boolean = false, sortDirection: string = "ASC"): Promise<BrowseImagesProps> {
    var userInfo = await Auth.currentAuthenticatedUser();

    let input = {
        username: userInfo.username,
        image: lessThan ? { lt: start} : { gt: start},
        sortDirection: sortDirection,
        //nextToken: token ? token : null,
        limit: 12
    };

    // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
    const { data } = await callGraphQLWithSimpleInput<ListIngestedImagesQuery>(
        {
            query: listIngestedImages,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: input
        }
    );

    const retVal = {
        images: data?.listIngestedImages?.items,
        token: data?.listIngestedImages?.nextToken
    }

    return retVal as BrowseImagesProps;
}

const ImageRow = (props: ImageRowProps) => {
    const [url, setUrl] = useState({ imageUrl: '', baseUrl: ''});

    useAsyncEffect(async isMounted => {
        if (props && props?.images && props?.images?.length && props.index < props?.images?.length) {
            if (!url.imageUrl || props.images[props.index].image != url.baseUrl) {
                const signedURL = await Storage.get(props.images[props.index].image.replace("public/", "")) as string;
                if (!isMounted()) return;

                setUrl({ imageUrl: signedURL, baseUrl: props.images[props.index].image});
            }
        } else {
            if (!url.imageUrl || url.baseUrl != '/images/greybackround.jpg') {
                setUrl({ imageUrl: '/images/greybackround.jpg', baseUrl: '/images/greybackround.jpg' });
            }
        }
    });

    return (
        <div style={{ border: "1px solid #dddddd" }} className="d-flex justify-content-center img-holder">
            {/* {url.imageUrl ? <Image src={url.imageUrl} alt="bogus" layout="fill"/> : null} */}
            {url.imageUrl ? <img src={url.imageUrl} alt="bogus" height="200" style={{ paddingTop: 20, paddingBottom: 20 }} /> : null}
            <button
                className="button btn btn-primary"
                onClick={() => copyImage(url.imageUrl)}>
                <Clipboard />
            </button>
        </div>
    )
}

export const BrowseImages = (dashProps: DashboardProps) => {
    const [pageProps, setPageProps] = useState({ images: [] as IngestedImage[] | null, token: '', fetchState: 'initial' });

    useAsyncEffect(async isMounted => {
        if (pageProps.fetchState == 'initial') {
            const props = await fetchImageSummary('0');
            if (!isMounted()) return;

            setPageProps({ images: props.images as IngestedImage[], token: props.token, fetchState: 'postLoad' });
        }
    });

    return (
        <div className="container-fluid">
            <div className="btn-group me-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-outline-info">
                    <ArrowLeftSquareFill
                    style={{ marginBottom: 2, fontSize: "160%" }}
                    onClick={(e) => clickPrev(e, pageProps, setPageProps)}
                    />
                </button>
                <button type="button" className="btn btn-outline-info">
                    <ArrowRightSquareFill 
                    style={{ marginBottom: 2, fontSize: "160%" }}
                    onClick={(e) => clickNext(e, pageProps, setPageProps)}
                    />
                </button>
            </div>

            <div className="row my-5">
                <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={0} />
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={1} />
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={2} />
                </div>
            </div>
            <div className="row my-5">
                <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={3} />
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={4} />
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={5} />
                </div>
            </div>
            <div className="row my-5">
                <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={6} />
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={7} />
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={8} />
                </div>
            </div>
            <div className="row my-5">
                <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={9} />
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={10} />
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <ImageRow images={pageProps.images as IngestedImage[]} index={11} />
                </div>
            </div>
        </div>
    )
}

export default BrowseImages;