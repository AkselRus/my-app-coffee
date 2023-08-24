import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

const Carusel = () => {
    const [index, setIndex] = useState(0);
    const dataCarousel = [
        "https://w-dog.ru/wallpapers/4/19/364561336480358/zavtrak-kofe-chashka-parizh-franciya-notr-dam-sobor-pruzhina-kruassan-dzhem-notr-dam.jpg",
        "https://irkutsk.bonodono.ru/upload/iblock/5cd/5cdcc6208beae5f7a26debf8acbf98a5.jpg",
        "https://i.ytimg.com/vi/FcMhCHurUI4/maxresdefault.jpg"
    ];
    // style={{ height: "500px" }}
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height="500px"
                    width="100%"
                    src={dataCarousel[0]}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height="500px"
                    width="100%"
                    src={dataCarousel[1]}
                    alt="Second slide"
                />
                {/* <ExampleCarouselImage text="Second slide" /> */}
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height="500px"
                    width="100%"
                    src={dataCarousel[2]}
                    alt="Second slide"
                />
                {/* <ExampleCarouselImage text="Third slide" /> */}
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
export default Carusel;
