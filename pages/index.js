import React from 'react'
import { Row, Col, Container, ButtonGroup, Button } from 'react-bootstrap';
const Home = function ({ allshows }) {
    const shows = allshows
    const [imgindex, setImgindex] = React.useState(0);
    const [x, setX] = React.useState(0);
    const touchstart = function (e) {
        if (e.clientX)
            setX(e.clientX)
        else setX(e.changedTouches[0].clientX)

    }
    const touchend = async function (e) {
        if (e.clientX) {
            if (e.clientX - x > 10 && imgindex > 0) {
                setImgindex(imgindex - 1)
            }
            else if (e.clientX - x < -10 && imgindex < shows.length - 1) {
                setImgindex(imgindex + 1)

            }
        }
        else {

            if (e.changedTouches[0].clientX - x > 10 && imgindex > 0) {
                setImgindex(imgindex - 1)
            }
            else if (e.changedTouches[0].clientX - x < -10 && imgindex < shows.length - 1) {
                setImgindex(imgindex + 1)
            }
        }

    }
    return (
        < div >
            <div className='btswiper'
                onMouseDown={touchstart} onTouchStart={touchstart} onTouchEnd={touchend}
                onMouseUp={touchend} >
                < div className='box' style={{ backgroundImage: 'url("' + shows[imgindex].imgurl + '")' }}>{imgindex < shows.length - 1 ? <img hidden src={shows[imgindex + 1].imgurl} /> : ''}</div>
                <Container fluid={true} >
                    <Row><Col xs={10} sm={10}>{shows[imgindex].title}</Col> <Col xs={2} sm={2}>({imgindex + 1}/{shows.length})</Col></Row>
                    {shows[imgindex]?.prix ?
                        <div>
                            <ButtonGroup vertical style={{width:'100%'}}>
                                <Button>直播间到手价</Button>
                                <Button disabled={true} variant='warning' className='prix'>{shows[imgindex].prix}</Button>
                            </ButtonGroup>

                            <div className='center'>报价日期 {shows[imgindex].date}</div>
                        </div>
                        : ''}
                </Container>
            </div >
        </div>
    );
};


export async function getStaticProps() {
    const res = await fetch('https://btshow.vercel.app/api/getallshows', {
        method: 'GET',
        headers: {}
    })
    const allshows = await res.json()
    return {
        props: { allshows },
        revalidate: 1
    }
}

export default Home