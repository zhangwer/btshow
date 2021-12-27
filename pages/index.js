import React from 'react'
import { Row, Col, Container, ButtonGroup, Button, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
const Home = function ({ allshows }) {

    const [shows, setShows] = React.useState(allshows);
    const [imgindex, setImgindex] = React.useState(0);
    const [x, setX] = React.useState(0);
    const [marque, setMarque] = React.useState('全部品牌');
    const [type, setType] = React.useState('全部品类');
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
    const getshowbymarque = async function (marque1) {
        setMarque(marque1)
        setImgindex(0)
        const res = await fetch('/api/searchshows', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({ type: type, marque: marque1 })
        })
        const json = await res.json()
        setShows(json)
    }
    const getshowbytype = async function (type1) {
        setType(type1)
        setImgindex(0)
        const res = await fetch('/api/searchshows', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({ type: type1, marque: marque })
        })
        const json = await res.json()
        setShows(json)
    }
    return (
        < div >
            <Navbar bg="light" expand={true}>
                <Container>
                   
                    <Navbar.Collapse >
                        <Nav>

                            <NavDropdown title={marque}>
                                <NavDropdown.Item onClick={() => { getshowbymarque('全部品牌') }}>全部品牌</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { getshowbymarque('lv') }}>lv</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { getshowbymarque('gucci') }}>gucci</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { getshowbymarque('prada') }}>prada</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <NavDropdown align="end" title={type}>
                                <NavDropdown.Item onClick={() => { getshowbytype('全部品类') }}>全部品类</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { getshowbytype('服饰') }}>服饰</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { getshowbytype('包包') }}>包包</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { getshowbytype('鞋子') }}>鞋子</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { getshowbytype('珠宝首饰') }}>珠宝首饰</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { getshowbytype('配饰') }}>配饰</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {shows.length > 0 ?
                <div className='btswiper'
                    onMouseDown={touchstart} onTouchStart={touchstart} onTouchEnd={touchend}
                    onMouseUp={touchend} >
                    < div className='box' style={{ backgroundImage: 'url("' + shows[imgindex].imgurl + '")' }}>{imgindex < shows.length - 1 ? <img hidden src={shows[imgindex + 1].imgurl} /> : ''}</div>
                    <Container fluid={true} >
                        <Row><Col xs={10} sm={10}>{shows[imgindex].title}</Col> <Col xs={2} sm={2}>({imgindex + 1}/{shows.length})</Col></Row>

                        <div>
                            {shows[imgindex]?.prix ?
                                <ButtonGroup vertical style={{ width: '100%' }}>
                                    <Button>直播间到手价</Button>
                                    <Button disabled={true} variant='warning' className='prix'>{shows[imgindex].prix} ￥</Button>
                                </ButtonGroup>
                                : ''}

                            <div className='center'>{shows[imgindex]?.europrix ? shows[imgindex]?.europrix + '€' : ''} 报价日期: {shows[imgindex].date} *以当日报价为准</div>
                        </div>

                    </Container>
                </div > : <Container fluid={true} className='center'>没有找到记录</Container>}
        </div >
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