import Link from 'next/link'

/*  This component reads in News Posts from a json file for display on the main page
 *  and sets up a dynamic link for each entry
 */

const News = ({posts}) => (
  <>
    <div>
      {posts.map((post, index) => {
        return (
          <Link key={index} href='/news/[id]' as={'/news/' + post.id}>
            <div className="news-wrap">
              <h2 className="title">{post.title}</h2>
              <h3 className="date">{post.date}</h3>
              <img className="news-img" src={post.img} />
              <p className="desc">{post.desc}</p>
          </div>
          </Link>
        )
      })}
    </div>
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
      .desc {
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


export default News