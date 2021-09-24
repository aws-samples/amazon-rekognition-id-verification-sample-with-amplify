
const headerToReplace = 'data:binary/octet-stream;base64,';
const base64headerJpeg = 'data:image/jpeg;base64,';
const base64headerPng = 'data:image/png;base64,';

export function getImageFromUploadComponent(image: any) {
    return image.replace(headerToReplace, '').replace(base64headerJpeg, '');
}