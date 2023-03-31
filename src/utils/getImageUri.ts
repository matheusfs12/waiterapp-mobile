export function getImageUri(imagePath: null | string) {
    if (!imagePath) {
        return '';
    }

    if (imagePath.includes('http')) {
        return imagePath;
    }

    return `${process.env.API_HOST}/uploads/${imagePath}`;
}
