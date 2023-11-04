import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Using props in the array function
const ImageList = ({ images, toggleSelect, handleImageHover, hoveredIndex }) => {

    return images.map((image, index) => (
        <Draggable key={image.key} draggableId={image.key} index={index}>
            {(provided, snapshot) => (
                <li
                //dragable component attributes
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gridColumn: index === 0 ? 'span 2' : 'span 1', // Adjust column span based on the index [Feature Image]
                        gridRow: index === 0 ? 'span 2' : 'span 1', // Adjust row span based on the index [Feature Image]
                        position: 'relative',
                        ...provided.draggableProps.style,
                    }}
                    // Handle mouse event which will effect Checkbox & transitions visiblity
                    onMouseEnter={() => handleImageHover(index)} 
                    onMouseLeave={() => handleImageHover(null)}
                >
                    <span className='image' style={{ position: 'relative' }}>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            style={{
                                position: 'absolute',
                                top: '.5rem',
                                left: '.5rem',
                                width: '1.25rem',
                                height: '1.25rem',
                                opacity: index === hoveredIndex || image.selected ? 1 : 0, // Adjust checkbox opacity based on conditions
                                //Setting Element appear on top of <img> to avoid overlapping
                                zIndex: 2,
                            }}
                            checked={image.selected} // Handle checkbox selection
                            onChange={() => toggleSelect(index)}
                        />

                        <img
                            className='border rounded mw-100 h-auto'
                            src={image.src}
                            alt={image.alt}
                            style={{
                                transition: 'filter 0.3s,opacity 0.3s',
                                 // Adjust brightness filter & opacity of the image based on conditions
                                filter: index === hoveredIndex ? "brightness(0.4)" : "brightness(1)" && image.selected ? "brightness(0.9)" : "brightness(1)",
                                opacity: index === hoveredIndex || image.selected ? 0.7 : 1,
                                //Setting Element appear to bottom to avoid overlapping each other
                                zIndex: 1,
                            }}
                        /> 
                    </span>
                </li>
            )}
        </Draggable>
    ));
};

export default ImageList;
