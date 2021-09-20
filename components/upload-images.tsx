import { Amplify, API, Auth, withSSRContext, graphqlOperation, Storage } from "aws-amplify"
import React, { FormEvent, useState } from "react"
import ImageUploading from 'react-images-uploading'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { createIngestedImage } from "../src/graphql/mutations"
import { CreateIngestedImageMutation } from "../src/API"
import Image from "next/image"
import { callGraphQL } from "../common/common-types"
import { DashboardProps } from "../common/dashboard-props"

const onUpload = async (imageList: any, removeAllImagesFunc: any) => {
    if (imageList) {
        for (let i = 0; i < imageList.length; i++) {
            var userInfo = await Auth.currentAuthenticatedUser();
            var filename = "blah1/" + imageList[i].file.name;

            try {
                const storageResponse = await Storage.put(filename,
                    imageList[i].file, {
                    metadata: { "user": userInfo.username },
                    progressCallback(progress: any) {
                        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
                    }
                });

                // // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
                // const { data } = await callGraphQL<CreateIngestedImageMutation>(
                //     {
                //         query: createIngestedImage,
                //         authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                //         variables: {
                //             input: {
                //                 image: filename,
                //             }
                //         }
                //     }
                // );

            } catch (errors) {
                console.log(errors);
            }
        }

        removeAllImagesFunc();
    }
}

export const UploadImages = (dashProps: DashboardProps) => {

    const [images, setImages] = useState([]);
    const maxNumber = 70;

    const onChange = async (imageList: any, addUpdateIndex: any) => {
        // data for submit
        //console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            className="btn btn-primary"
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;
                        {imageList && imageList.length > 0 &&
                            <div className="d-inline">
                                <button
                                    onClick={() => onUpload(imageList, onImageRemoveAll)}
                                    style={{ marginLeft: "5px" }}
                                    className="btn btn-success"
                                >
                                    Upload all images
                                </button>
                                <button
                                    onClick={onImageRemoveAll}
                                    style={{ marginLeft: "5px" }}
                                    className="btn btn-warning"
                                >
                                    Remove all images
                                </button>
                            </div>
                        }
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item border border-info m-2 p-2">
                                <Image src={image['data_url']} alt="" width="200" height="200" />
                                <div className="image-item__btn-wrapper">
                                    <button className="btn btn-primary" style={{ marginRight: "5px" }} onClick={() => onImageUpdate(index)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default UploadImages;