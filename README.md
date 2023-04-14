# Delivery-website notes


Models

- products
- categories
- new user
- new partner

Controllers



-customerController
    -registerCustomer (if email not in use)     DONE
    -updateCustomer (if email exists)           NO FUNCIONA PORQUE NOS DEJA UPDATE MUCHAS VECES CON EL MISMO EMAIL
    -removeCustomer (if customer exists)     DONE  missing that email should be the one of the user logged in not an input

-restaurantController
    -registerRestaurant      DONE
    -updateRestaurant       
    -removeRestaurant       DONE missing that email should be the one of the restaurant logged in not an input


-productController
    -addProduct 
    -removeProduct (if product exists)
    -updateProduct (if prod exists)

-orderController
    -addProductCart
    -removeProductCart
    -increaseCart
    -decreaseCart

-loginController
    -loginCustomer
    -loginRestaurant

-logoutController
    -logoutCustomer
    -logoutRestaurant

-adressController
    







