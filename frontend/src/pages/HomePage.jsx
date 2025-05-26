import { useColorModeValue } from '../components/ui/color-mode';
import ProductCard from '../components/ui/ProductCard';
import { useProductStore } from '../store/product';
// import {fetchProducts} from '../store/product';
import { Container, SimpleGrid, StackSeparator, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const textColor = useColorModeValue("gray.600", "gray.200");
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW='container.xl' py={20}>
      <VStack spacing={10} separator={<StackSeparator />}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
          color={textColor}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          gap="20px"
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={8}
          w={"full"}
        >
          {products
            .filter((product) => product && product._id) // ✅ filter invalid
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage
