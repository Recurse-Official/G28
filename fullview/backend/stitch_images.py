import cv2
import sys
import os

def stitch_images(image_files, output_file):
    """
    Stitches a list of images into a panorama and saves the result.

    Args:
        image_files (list): List of image file paths to stitch.
        output_file (str): Path to save the stitched panorama.
    """
    # Read all images
    images = []
    for image in image_files:
        img = cv2.imread(image)
        if img is None:
            print(f"Error: Unable to read file {image}. Skipping...")
            continue
        images.append(img)

    if len(images) < 2:
        print("Error: Need at least 2 images for stitching.")
        sys.exit(1)

    # Create a stitcher instance
    stitcher = cv2.Stitcher_create()

    # Perform stitching
    print("Starting image stitching...")
    status, stitched_image = stitcher.stitch(images)

    if status == cv2.Stitcher_OK:
        cv2.imwrite(output_file, stitched_image)
        print(f"Stitched image saved at {output_file}")
    else:
        print(f"Error during stitching: Status code {status}")
        sys.exit(1)

if __name__ == "__main__":
    """
    Main function to handle command-line arguments and invoke stitching.
    """
    # Input arguments: image files followed by output file path
    if len(sys.argv) < 3:
        print("Usage: python stitch_images.py <image1> <image2> ... <output_file>")
        sys.exit(1)

    image_files = sys.argv[1:-1]
    output_file = sys.argv[-1]

    # Ensure all input images exist
    for image in image_files:
        if not os.path.exists(image):
            print(f"Error: File not found: {image}")
            sys.exit(1)

    # Call the stitching function
    try:
        stitch_images(image_files, output_file)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)
