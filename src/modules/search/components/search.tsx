import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {Button, Card, Carousel, Input, Space} from 'antd';
import * as parse5 from 'parse5';
import {searchStart} from "../actions/search";
import search from "../containers/search";
import ReactHtmlParser from 'react-html-parser';
import Item from "antd/es/list/Item";
import Icon from "antd/es/icon";
import { useSnapCarousel } from 'react-snap-carousel';

const { Search } = Input;

interface SearchFieldProps {
    content: any[];
    searchStart: (search: string) => void;
}

const SearchField = ({content, searchStart}:SearchFieldProps) => {
    console.log(content)

    const { scrollRef, pages, activePageIndex, next, prev, goTo } =
        useSnapCarousel();
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

                        <ul
                            ref={scrollRef}
                            style={{
                                display: 'flex',
                                overflow: 'auto',
                                scrollSnapType: 'x mandatory'
                            }}
                        >
                            {con.images.map((image: any) => (
                                <li
                                    style={{
                                        backgroundColor: 'aqua',
                                        fontSize: '50px',
                                        width: '250px',
                                        height: '250px',
                                        flexShrink: 0,
                                        color: '#fff',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <img src={image?.image?.link}  />
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => prev()}>Prev</button>
                        <button onClick={() => next()}>Next</button>
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