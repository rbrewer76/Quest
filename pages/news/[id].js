import LayoutPost from '../../src/components/news/LayoutPost'
import posts from '../../posts/posts.json'

/*  Statically generate News posts and their paths
 */

const Post = ({post}) => {
  return (
    <>
      <LayoutPost>
        <div className="news-wrap">
          <h2 className="title">{post.title}</h2>
          <h3 className="date">{post.date}</h3>
          <img className="news-img" src={post.img} />
          <p className="content">{post.desc}</p>
        </div>
      </LayoutPost>
      <style jsx>{`
        .news-wrap {
          padding: 20px;
          max-width: 846px;
        }
        .title {
          margin: 0;
        }
        .date {
          margin: 0;
          text-align: end;
          color: gray;
        }
        .news-img {
          max-width: 100%;
          height: auto;
        }
        .content {
          margin: 0;
          text-align: start;
          color: #404040;
        }    

        @media only screen and (max-width: 1265px) {
          .news-wrap {
            max-width: 100%;
          }
        }    
      `}</style>
    </>
  )
}


export const getStaticPaths = () => {
  const paths = posts.map((post) => ({params: {id: post.id}}))    
  return {paths, fallback: false}    
}


export const getStaticProps = ({params}) => {
  const post = posts.find(x => x.id === params.id)
  return {props: {post}}
}


export default Post