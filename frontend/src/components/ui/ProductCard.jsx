import { Box, Button, Heading, HStack, IconButton, Image, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useColorModeValue } from './color-mode';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { toaster } from './toaster';
import { useProductStore } from '../../store/product';

// import {
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalOverlay,
// } from '@chakra-ui/react'
const ProductCard = ({ product }) => {
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const { deleteProduct, updateProduct } = useProductStore();
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	// < Toaster />

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};


	const handleUpdateProduct = async (pid, updatedProduct) => {
		// const { success, message } = await updateProduct(pid, updatedProduct);

		// // setIsPopupOpen(false);
		// if (!success) {
		// 	toaster.create({
		// 		title: "Error",
		// 		description: message,
		// 		status: "error",
		// 		duration: 3000,
		// 		isClosable: true,
		// 	});
		// } else {
		// 	toaster.create({
		// 		title: "Success",
		// 		description: "Product updated successfully",
		// 		status: "success",
		// 		duration: 3000,
		// 		isClosable: true,
		// 	});
		// }
		const { success, message, product } = await updateProduct(pid, updatedProduct);

		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
			});
			return;
		}
		setIsPopupOpen(false);
		// Now `product` is defined — no more ._id error
		toaster.create({
			title: "Updated",
			description: `Product  updated successfully.`,
			status: "success",
		});
	};


	return (

		<Box
			shadow="lg"
			rounded="lg"
			overflow="visible"
			transition="transform 0.3s ease, box-shadow 0.3s ease"
			willChange="transform, box-shadow"
			_hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
			bg={bg}
		>
			{/* <Toaster /> */}

			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>


				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>



					<IconButton aria-label="Delete product"

						onClick={() => handleDeleteProduct(product._id)} >

						<MdOutlineDelete size={30} /></IconButton>
					<IconButton
						aria-label="Edit product"
						onClick={() => setIsPopupOpen(true)}

					> <FaRegEdit /></IconButton>

				</HStack>

			</Box>

			{isPopupOpen && (
				<Box
					position="absolute"
					top="0"
					left="0"
					width="100%"
					height="100vh"
					bg="rgba(0, 0, 0, 0.5)"
					display="flex"
					justifyContent="center"
					alignItems="center"
					zIndex="1000"
				>
					<Box
					    position= "absolute"
    					top= "0"

						bg="black"
						p={6}
						borderRadius="8px"
						boxShadow="lg"
						w="90%"
						maxW="400px"
					>
						<Heading as="h3" size="md" mb={4}>Edit Product</Heading>

						<Input
							placeholder="Product Name"
							name="name"
							value={updatedProduct.name}
							onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							mb={3}
						/>
						<Input
							placeholder="Price"
							name="price"
							type="number"
							value={updatedProduct.price}
							onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							mb={3}
						/>
						<Input
							placeholder="Image URL"
							name="image"
							value={updatedProduct.image}
							onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							mb={4}
						/>

						<HStack justify="flex-end">
							<Button onClick={() => setIsPopupOpen(false)} variant="outline">Cancel</Button>
							<Button onClick={() => handleUpdateProduct(product._id, updatedProduct)} colorScheme="blue">Update</Button>
						</HStack>
					</Box>
				</Box>
			)}


		</Box >


	)
}

export default ProductCard
