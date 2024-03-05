/* eslint-disable no-unused-vars */
import { Pagination, Text } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHeadroom } from '@mantine/hooks';
import { randomId } from '@mantine/hooks';
import { Context } from '../../App';

function chunk(array, size) {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }
  
  const data = chunk(
    Array(30)
      .fill(0)
      .map((_, index) => ({ id: index, name: randomId() })),
    10
  );
  
export default function MyProjects() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);
    const [activePage, setPage] = useState(1);
    const items = data[activePage - 1].map((item) => (
        <Text key={item.id}>
        
        </Text>
    ));

    return (
        <>
            {items}
            <Pagination total={data.length} value={activePage} onChange={setPage} mt="sm" />
        </>
    )
}