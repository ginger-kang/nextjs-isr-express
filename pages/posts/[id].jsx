import * as React from 'react'
import { useRouter } from 'next/dist/client/router'
import Identicon from 'identicon.js'
import { hashGeneratorHelper } from '../../src/utils/hashGeneratorHelper'
import Post from '../../src/components/Post'

const Posts = ({ id, identicon }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Post identicon={identicon} id={id} />
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const id = params.id

  const identicon = new Identicon(id, { size: 200 }).toString()

  // await new Promise(res => setTimeout(res, 1000))

  return {
    props: {
      id,
      identicon,
    },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  const hashs = hashGeneratorHelper({ length: 15, count: 10 })

  const paths = hashs.map(hash => {
    return { params: { id: hash } }
  })

  return {
    paths,
    fallback: true,
  }
}

export default Posts
