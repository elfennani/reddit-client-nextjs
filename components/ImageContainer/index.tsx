import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { ImagesMetadata } from "../../repository/reddit_api";
import Button from "../Button";
import styles from "./ImageContainer.module.scss";

/**
 * @typedef ImagesContainerProps
 * @property {string} image
 * @property {string} alt
 * @property {boolean} blur
 * @property {boolean} ignoreSize
 * @property {import("../../repository/reddit_api").ImagesMetadata[]} imagesMetadata
 */
/**
 *
 * @param {ImagesContainerProps} props
 * @returns
 */
interface ImageContainerProps {
    image?: string;
    imagesMetadata?: ImagesMetadata[];
    blur?: boolean;
    alt?: string;
    ignoreSize?: boolean;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
    image,
    imagesMetadata,
    blur,
    alt,
    ignoreSize,
}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [showLink, setShowLink] = useState(false);
    const container = useRef<any>();

    useLayoutEffect(() => {
        if (!container.current) return;
        if (container.current.clientHeight < container.current.scrollHeight) {
            setShowLink(true);
        }
        return () => {};
    }, [container]);

    if (image)
        return (
            <>
                <div
                    ref={container}
                    className={[
                        styles.imageContainer,
                        ignoreSize ? styles.ignoreSize : null,
                        blur ? styles.blur : null,
                        showLink ? styles.overflown : null,
                    ].join(" ")}
                >
                    <img src={image} alt={alt || image} />
                    {showLink && (
                        <Button
                            className={styles.showMore}
                            title="Show more"
                            onClick={() => {}}
                        />
                    )}
                </div>
            </>
        );

    if (!imagesMetadata) return <div></div>;

    const selectedImage = imagesMetadata[currentImage];

    return (
        <div
            ref={container}
            className={[
                styles.slideshow,
                ignoreSize ? styles.ignoreSize : null,
                blur ? styles.blur : null,
                showLink ? styles.overflown : null,
            ].join(" ")}
        >
            <img
                src={selectedImage.url}
                alt={selectedImage.title || selectedImage.url}
            />
            {currentImage < imagesMetadata.length - 1 && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        return setCurrentImage((current) => current + 1);
                    }}
                    className={[styles.slideshowButton, styles.nextButton].join(
                        " "
                    )}
                >
                    next
                </button>
            )}
            {currentImage != 0 && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        return setCurrentImage((current) => current - 1);
                    }}
                    className={[styles.slideshowButton, styles.prevButton].join(
                        " "
                    )}
                >
                    prev
                </button>
            )}
            {showLink && (
                <Button
                    className={styles.showMore}
                    title="Show more"
                    onClick={() => {}}
                />
            )}
        </div>
    );
};

export default ImageContainer;
