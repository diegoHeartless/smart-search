import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {Button, Card, Carousel, Col, Input, Row, Space} from 'antd';
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
        content?.forEach((con: any, index) => {
            console.log()
            result.push(
                <Col span={6}>
                    <Card title={con.title} extra={<a href={con.link}>link</a>} >
                        <p>{con.price}</p>
                        <CarouselProvider
                            totalSlides={con.images.length}
                            naturalSlideWidth={200}
                            naturalSlideHeight={200}

                        >
                            <Slider>
                            {con.images.map((image, index) => {
                                console.log(index)
                                    return (<Slide index={index}>
                                       <img src={image?.image?.link} width={200} height={200} />
                                    </Slide>)

                            })}
                                </Slider>
                            <ButtonBack>Back</ButtonBack>
                            <ButtonNext>Next</ButtonNext>
                    </CarouselProvider>
                    </Card>
                </Col>
            )
        })
        const rows: ReactElement[] = [];
        console.log(result.length)
        while (result.length !== 0) {

            const row = result.splice(0, 4);
            console.log(result.length)
            rows.push(<Row>
                {row}
            </Row>)
        }


        return rows
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