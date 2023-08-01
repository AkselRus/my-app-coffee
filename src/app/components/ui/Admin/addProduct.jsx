import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import { nanoid } from "nanoid";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import SelectField from "../selectField";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../store/products";
import { getCategories } from "../../../store/categories";

const AddProduct = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getCategories());
    const [data, setData] = useState({
        id: nanoid(),
        name: "",
        quantity: "",
        categories: "67rdca3eeb7f6fgeed471818",
        description: "",
        price: "",
        image: "https://brend-mebel.ru/image/no_image.jpg"
    });
    const [errors, setErrors] = useState({});
    const categoriesList = categories.map((q) => ({
        label: q.name,
        value: q.id
    }));
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
        description: {
            isRequired: {
                message: "Описание обязательно для заполнения"
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
        dispatch(createProduct(data));
    };
    return (
        <div className="col-lg-5">
            <div className="card bg-body text-white rounded-3">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">Add product</div>
                        <TextField
                            label="Название товара"
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
                        <TextAreaField
                            label="Описание товара"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            error={errors.description}
                        />
                        <SelectField
                            label="Выберите категорию товара"
                            defaultOption="Choose..."
                            options={categoriesList}
                            name="categories"
                            onChange={handleChange}
                            value={data.categories}
                            error={errors.categories}
                        />
                        <TextField
                            label="Стоимость товара"
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            error={errors.price}
                        />
                        {/* <TextField
                label="Загрузите фотографию"
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                error={errors.image}
            /> */}
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!isValid}
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
