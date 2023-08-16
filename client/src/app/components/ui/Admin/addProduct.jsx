import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import SelectField from "../selectField";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
    createProduct,
    getProductById,
    updateProduct
} from "../../../store/products";
import { getCategories } from "../../../store/categories";
import { useParams } from "react-router-dom";
import { MyUploadButton } from "../../UpLoader";

const defaultData = {
    id: nanoid(),
    name: "",
    quantity: "",
    categories: "",
    description: "",
    bookmark: false,
    price: "",
    image: "https://brend-mebel.ru/image/no_image.jpg"
};

const AddProduct = () => {
    const dispatch = useDispatch();
    const { prodId } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);

    const productEditPage = useSelector(getProductById(prodId));
    const categories = useSelector(getCategories());
    const test = prodId ? productEditPage : defaultData;
    const [data, setData] = useState(test);
    const [errors, setErrors] = useState({});
    const categoriesList = categories?.map((q) => ({
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
        if (selectedImage) {
            const newData = { ...data, image: selectedImage[0].fileUrl };
            console.log("newData", newData);
            dispatch(createProduct(newData));
            window.location.assign("/admin");
        } else dispatch(createProduct(data));
    };
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        console.log("handleSubmitUpdate");
        if (selectedImage) {
            const newData = { ...data, image: selectedImage[0].fileUrl };
            console.log("newData", newData);
            dispatch(updateProduct(newData));
            window.location.assign("/admin");
        } else dispatch(updateProduct(data));
    };
    return (
        <div className="col-lg-5">
            <div className="card bg-body text-white">
                <div className="card-body bg-dark rounded-3">
                    <form onSubmit={prodId ? handleSubmitUpdate : handleSubmit}>
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

                        <MyUploadButton setFiles={setSelectedImage} />
                        {selectedImage && (
                            <div className="card-body m-2 border border-primary rounded">
                                <img
                                    alt="not found"
                                    width={"250px"}
                                    className="card-img-top"
                                    src={selectedImage[0].fileUrl}
                                />
                                <br />
                                <button
                                    className="btn btn-danger m-2"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                        <button
                            className="btn btn-primary m-2"
                            type="submit"
                            disabled={!isValid}
                        >
                            {prodId ? "Обновить" : "Создать"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
