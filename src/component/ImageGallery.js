//React Component Importing
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FaCheckSquare } from "react-icons/fa";
import { BiImage } from "react-icons/bi";

//Importing Custom Compoenent
import ImageList from './ImageList';



const ImagesGallery = () => {

    // Define state variables for managing images and their selection
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Function to import image files from a specified directory
    const importAll = (r) => r.keys().map(r);
    const imageFiles = importAll(require.context('../assets/image', false, /\.(png|jpe?g|gif|svg|webp)$/));

    // Initialize images if they are not loaded
    if (images.length === 0) {
        const initialImages = imageFiles.map((imageFile, index) => ({
            src: imageFile,
            alt: `Image ${index}`,
            key: `image-${index}`,
            // boolean statement for image checkbox
            selected: false,
        }));
        //setting initial loaded image as a list 
        setImages(initialImages);
    }

    // Function to toggle the selection of an image

    const toggleSelect = (index) => {

        // copy of images array to avoid mutating the original
        // Toggle the selected (boolean) property of the image at the specified index

        const updatedImages = [...images];
        updatedImages[index].selected = !updatedImages[index].selected;
        setImages(updatedImages);

        //filtering images to sent to SelectedImage Array
        if (updatedImages[index].selected) {
            setSelectedImages([...selectedImages, updatedImages[index]]);
        } else {
            setSelectedImages(selectedImages.filter(image => image.key !== updatedImages[index].key));
        }
    };

    // Function to handle image hover to show Checkbox & effects
    const handleImageHover = (index) => {
        setHoveredIndex(index);
    };

    // Function called when an image is dragged and dropped
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedImages = Array.from(images);
        const [removed] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, removed);

        setImages(reorderedImages);
    };

    // Function to handle image deletion by filtering out images that are not selected
    const handleDelete = () => {
        const updatedImages = images.filter((image) => !image.selected);
        setImages(updatedImages);
        setSelectedImages([]);
    };

    return (
        
        <div className='d-flex justify-content-center align-items-center min-vh-100 bg-secondary'>            
            <Card style={{
                maxWidth: '70%',
                width: '100%',
            }}>
                <CardHeader className='py-3 d-flex justify-content-between'>
                {/* If images are selected, display the number of selected files or Just Show Gallery word */}
                    <h3>
                        {selectedImages.length > 0
                            ? 
                            <span> 
                                <FaCheckSquare className='text-primary'/> 
                                {selectedImages.length} Files Selected
                            </span>
                            : 'Gallery'}
                    </h3>
                    {/* Render Delete Button if any image is selected */}
                    {selectedImages.length > 0 && (
                        <Button className='btn btn-light btn-outline-danger' onClick={handleDelete}>Delete</Button>
                    )}
                </CardHeader>
                <CardBody>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="image-list" direction="horizontal">
                            {(provided) => (
                                <ul
                                    ref={provided.innerRef}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(5, 1fr)',
                                        gridGap: '1.2rem',
                                        listStyle: 'none',
                                        padding: 0,
                                    }}
                                >
                                    {/* Imported Custom made component of the image list */}
                                    <ImageList 
                                    //Passing props to ImageList component
                                    images={images} 
                                    toggleSelect={toggleSelect} 
                                    handleImageHover={handleImageHover} 
                                    hoveredIndex={hoveredIndex} />

                                    {/* Button to add More image */}
                                    <Button className="btn btn-light d-flex flex-column justify-content-center align-items-center"
                                        style={{ border: '1px dashed lightgrey', borderRadius: '10px'}}>
                                        <BiImage size={30}/>
                                        <h6>Add Image</h6>
                                    </Button>
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </CardBody>
            </Card>
        </div>
    );
};

export default ImagesGallery;
