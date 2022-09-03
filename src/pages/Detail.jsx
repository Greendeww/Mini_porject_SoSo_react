import React from 'react'
import Header from '../components/layout/Header'
import DetailPost from '../components/detailPost/DetailPost'
import Image from '../components/image/Image'

const Detail = () => {
  return (
    <>
      <Header/>
      <DetailPost/>
      <h1>이미지 연습</h1>
      <Image/>
    </>
    
  )
}

export default Detail