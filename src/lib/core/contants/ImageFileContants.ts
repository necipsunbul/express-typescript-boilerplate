enum ImageMimeTypes {
    JPG = "image/jpeg",
    PNG = "image/png",
    WEBP = "image/webp",
}

enum ImageExtensions {
    JPG = "jpg",
    JPEG = "jpeg",
    PNG = "png",
    WEBP = "webp",
}

export default class ImageFileConstants {
    static MimeTypes: ImageMimeTypes[] = [
        ImageMimeTypes.JPG,
        ImageMimeTypes.PNG,
        ImageMimeTypes.WEBP,
    ];
    static Extensions: ImageExtensions[] = [
        ImageExtensions.JPEG,
        ImageExtensions.JPG,
        ImageExtensions.PNG,
        ImageExtensions.WEBP,
    ];
}