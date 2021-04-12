import Layout from '../src/components/Layout'
import News from '../src/components/news/News'
import newsPosts from '../posts/posts.json'

const Index = ({posts}) => {

  return (
    <>
      <Layout>
        <div id="index-container">
          <img id="quest" src="\img\news\quest-welcome.png" />
          <News posts={posts} />
        </div>
      </Layout>

      <style jsx>{`
        #index-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          width: 100%;
          text-align: center;
          overflow: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
        }
        #quest {
          margin-top: 20px;
        }

        @media only screen and (max-width: 1265px) {
          #quest {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}


export const getServerSideProps = async () => {
  const posts = newsPosts
  return {props: {posts}}
}


export default Index