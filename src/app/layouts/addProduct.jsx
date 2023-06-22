import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import { nanoid } from "nanoid";
import TextField from "../components/common/form/textField";
import productService from "../services/product.service";
import { useHistory } from "react-router-dom";
// import { useProducts } from "../hooks/useProducts";

const AddProduct = () => {
    const history = useHistory();
    // const { createProduct } = useProducts();
    const [data, setData] = useState({
        id: nanoid(),
        name: "",
        quantity: "",
        description: "",
        price: "",
        image: "https://brend-mebel.ru/image/no_image.jpg"
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        quantity: {
            isRequired: {
                message: "Количество обязательно для заполнения"
            }
        },
        price: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        try {
            console.log(data);
            await productService.create(data);
            // await createProduct(data);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };
    console.log(data);
    return (
        <form onSubmit={handleSubmit}>
            <div>Add product</div>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Количество товара"
                name="quantity"
                type="number"
                value={data.quantity}
                onChange={handleChange}
                error={errors.quantity}
            />
            <TextField
                label="Описание товара"
                name="description"
                value={data.description}
                onChange={handleChange}
                error={errors.description}
            />
            <TextField
                label="Стоимость товара"
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                error={errors.price}
            />
            <TextField
                label="Загрузите фотографию"
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                error={errors.image}
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Create
            </button>
        </form>
    );
};

export default AddProduct;
