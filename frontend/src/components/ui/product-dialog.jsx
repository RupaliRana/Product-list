
'use client'

import {
    Button,
    Portal,
    createOverlay,
    Input,
    VStack,
} from '@chakra-ui/react'
import { useProductStore } from '../../store/product';
import { useState } from 'react';
import { Dialog } from "@ark-ui/react";

export const productDialog = createOverlay((props) => {
    const { id, title, product, onUpdate, ...rest } = props;
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { updateProduct } = useProductStore();
    const handleClose = () => {
        productDialog.close(id) // ✅ pass the ID used when opening
    }

    const handleUpdateProduct = async () => {
        const { success, message } = await updateProduct(product.id, updatedProduct);

        handleClose();

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
        if (onUpdate) {
            onUpdate(updatedProduct);
        }
    };

    return (
        <Dialog.Root id={id}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        {title && (
                            <Dialog.Header>
                                <Dialog.Title>{title}</Dialog.Title>
                            </Dialog.Header>
                        )}
                        <Dialog.Body spaceY="4">

                            {/* {rest.content} */}
                            <VStack spacing={4}>
                                <Input
                                    placeholder='Product Name'
                                    name='name'
                                    value={updatedProduct.name}
                                    onChange={(e) =>
                                        setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder='Price'
                                    name='price'
                                    type='number'
                                    value={updatedProduct.price}
                                    onChange={(e) =>
                                        setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                                    }
                                />
                                <Input
                                    placeholder='Image URL'
                                    name='image'
                                    value={updatedProduct.image}
                                    onChange={(e) =>
                                        setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                                    }
                                />
                            </VStack>

                            <VStack spacing={4} mt={4}>
                                <Button colorScheme="blue" onClick={handleUpdateProduct}>
                                    Update
                                </Button>
                                <Button variant="ghost" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </VStack>
                            <VStack spacing={4} mt={4}>
                                <Button colorScheme="blue" onClick={handleUpdateProduct}>
                                    Update
                                </Button>
                                <Button variant="ghost" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </VStack>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
})
