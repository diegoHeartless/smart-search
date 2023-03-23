import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {Button, Card, Carousel, Input, Space} from 'antd';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const { Search } = Input;

interface SearchFieldProps {
    content: any[];
    searchStart: (search: string) => void;
}

const SearchField = ({content, searchStart}:SearchFieldProps) => {
    console.log(content)

    const onSearch = (value: string) => {
        console.log(value)
        searchStart(value);
    };
    const [contentS, setContentS] = useState<any[]>();

    const elements = useCallback(()=> {
        const result: any = [];
        content?.forEach((con: any) => {
            console.log()
            result.push(
                <div>
                    <Card title={con.title} extra={<a href={con.link}>link</a>} style={{ width: 300 }}>
                        <p>{con.price}</p>
                        <CarouselProvider
                            totalSlides={con.images.length}
                            naturalSlideWidth={100}
                            naturalSlideHeight={100}

                        >
                            <Slider>
                            {con.images.map((image, index) => {
                                console.log(index)
                                    return (<Slide index={index}>
                                       <img src={image?.image?.link} width={100} height={100} />
                                    </Slide>)

                            })}
                                </Slider>
                            <ButtonBack>Back</ButtonBack>
                            <ButtonNext>Next</ButtonNext>
                    </CarouselProvider>
                    </Card>
                </div>
            )
        })
        return result
    }, [content])

    return <><Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
    />
        <div>
            {elements()}
        </div>
    </>
}

export default SearchField;