import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {Button, Card, Carousel, Col, Input, Progress, Row, Space, Spin} from 'antd';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const {Search} = Input;

interface SearchFieldProps {
    content: any[];
    searchStart: (search: string) => void;
    loading: boolean,
    statistics: {
        showed: number,
        hided: number
    }
}

const SearchField = ({content, searchStart, loading, statistics}: SearchFieldProps) => {
    const [searchValue, setSearchValue] = useState('')
    const onSearch = (value: string) => {
        console.log(value)
        setSearchValue(value);
        searchStart(value);
    };
    const [contentS, setContentS] = useState<any[]>();

    const elements = useCallback(() => {
        const result: any = [];
        content?.forEach((con: any, index) => {
            console.log()
            result.push(
                <Col span={6}>
                    <Card title={con.title} extra={<a href={con.link}>link</a>}>
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
                                        <img src={image?.image?.link} width={200} height={200}/>
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
        while (result.length !== 0) {

            const row = result.splice(0, 4);
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
        {loading ?
            <Spin tip="Loading" size="large" style={{
                top: 100
            }}>
                <div className="content"/>
            </Spin>
            :
            <div>
                <span>Скрыто: {statistics.hided} Показано: {statistics.showed}</span>
                <Progress percent={statistics.hided/(statistics.showed + statistics.hided) * 100} />
                <Button
                    onClick={() => onSearch(searchValue)}>
                    Искать дальше
                </Button>
                {elements()}
            </div>}
    </>
}

export default SearchField;