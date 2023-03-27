import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {Button, Card, Carousel, Col, Input, Progress, Radio, Row, Space, Spin} from 'antd';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {SearchType} from "../utils/consts";
import Link from "antd/es/typography/Link";

const {Search} = Input;

interface SearchFieldProps {
    content: any[];
    searchStart: (search: string, searchType: SearchType) => void;
    loading: boolean,
    statistics: {
        showed: number,
        hided: number
    }
}

const SearchField = ({content, searchStart, loading, statistics}: SearchFieldProps) => {
    const [searchType, setSearchType] = useState(SearchType.FullMatch)
    const [searchValue, setSearchValue] = useState('')
    const onSearch = (value: string) => {
        setSearchValue(value);
        searchStart(value, searchType);
    };
    const [contentS, setContentS] = useState<any[]>();

    const elements = useCallback(() => {
        const result: any = [];
        content?.forEach((con: any, index) => {
            result.push(
                <Col span={6}>
                    <Card title={<Link href={con.link} target={"_blank"} >{con.title}</Link>}>
                        <p>{con.price}</p>
                        <CarouselProvider
                            totalSlides={con.images.length}
                            naturalSlideWidth={200}
                            naturalSlideHeight={200}
                        >
                            <Slider>
                                {con.images.map((image, index) => {
                                    return (<Slide index={index}>
                                        <img src={image} width={200} height={200} loading="lazy"/>
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

        <Radio.Group onChange={(event)=> setSearchType(event.target.value)} value={searchType}>
            <Radio value={SearchType.FullMatch}>Полное совпадение</Radio>
            <Radio value={SearchType.AnyOrderMatch}>Включается все слова из запроса</Radio>
        </Radio.Group>
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