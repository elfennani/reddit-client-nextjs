import Image from "next/image";
import React, { useContext, useState } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import DisableImageContext from "../../contexts/DisableImageContext";
import { ImagesMetadata } from "../../types/types";
import Button from "../Button";
import styles from "./ImageContainer.module.scss";

interface ImageContainerProps {
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
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
    ...props
}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [showLink, setShowLink] = useState(false);
    const container = useRef<any>();
    const disabledImages = useContext(DisableImageContext);

    useLayoutEffect(() => {
        if (!container.current) return;
        if (container.current.clientHeight < container.current.scrollHeight) {
            setShowLink(true);
        }
        return () => {};
    }, [container]);

    if (disabledImages) return <div></div>;

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
                    <Image
                        src={image}
                        alt={alt || image}
                        width={props.imageWidth}
                        height={props.imageHeight}
                        layout="responsive"
                    />
                    {showLink && (
                        <Button
                            className={styles.showMore}
                            title="Show more"
                            onClick={() => {}}
                        >
                            Show more
                        </Button>
                    )}
                </div>
            </>
        );

    if (!imagesMetadata) return <div></div>;

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
            {imagesMetadata.map((imageMetadata, index) => (
                <Image
                    src={imageMetadata.url}
                    alt={imageMetadata.title || imageMetadata.url}
                    key={imageMetadata.id}
                    width={imageMetadata.width}
                    height={imageMetadata.height}
                    layout="responsive"
                    style={{
                        display: currentImage == index ? "block" : "none",
                    }}
                />
            ))}
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
                >
                    Show more
                </Button>
            )}
        </div>
    );
};

export default ImageContainer;
