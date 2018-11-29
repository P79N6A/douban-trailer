import React, { Component } from 'react'
import moment from 'moment'
import {
  Card,
  Row,
  Col,
  Badge,
  Icon,
  Spin,
  Modal
} from 'antd'
const Meta = Card.Meta
import 'moment/locale/zh-cn'
import {Link} from 'react-router-dom'
const site = 'http'
moment.locale('zh-cn')
export default class Content extends Component {
  state = { visible: false }
  _handleClose = (e) => {
    if (this.player && this.player.pause) {
      this.player.pause()
    }
  }
  _handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  _jumpToDetail = () => {
    const { url } = this.props
    url && window.open(url)
  }

  _showModal = (movie) => {
    this.setState({
      visible: true
    })
    const video = site + movie.videoKey
    const pic = site + movie.coverKey
    if (!this.player) {
      setTimeout(() => {
        this.player = new Dplayer({
          container: document.getElementsByClassName('videoModal')[0],
          screenshot: true,
          autoplay: true,
          video: {
            url: video,
            pic: pic,
            thumbnails: pic
          }
        })
      }, 500)
    } else {
      if (play.video.currentSrc !== video) {
        this.player.switchVideo({
          url: video,
          pic: pic,
          autoplay: true,
          type: 'auto'
        })
      }
      this.player.play()
    }
  }
  render () {
    const { movies } = this.props
    console.log('movies', movies)
    return (
      <div style={{ padding: '30px'}}>
        <Row>
          {
            movies.map((it, i) => (
              <Col
                key={i}
                xl={{span: 6}}
                lg={{span: 8}}
                md={{span: 12}}
                sm={{span: 24}}
                style={{marginBottom: '8px'}}
              >
                <Card
                  bordered={false}
                  hoverable
                  style={{ width: '100%' }}
                  actions={[
                    <Badge>
                      <Icon style={{marginRight: '2px'}} type='clock-circle' />
                      {moment(it.meta.createAt).fromNow(true)}前更新
                    </Badge>,
                    <Badge>
                      <Icon style={{marginRight: '2px'}} type='star' />
                      {it.rate}分
                    </Badge>,
                  ]}
                  cover={<img onClick={() => this._showModal(it)} src={it.poster} />}
                >
                  <Meta
                    style={{height: '202px', overflow: 'hidden'}}
                    title={<Link to={`/detail/${it._id}`} >{it.title}</Link>}
                    description={<Link to={`/detail/${it.summary}`} >{it.title}</Link>}
                    onClick={this._jumpToDetail}
                  />
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal
          className='videoModal'
          footer={null}
          visible={this.state.visible}
          afterClose={this._handleClose}
          onCancel={this._handleCancel}
        >
          <Spin size='large' />
        </Modal>
      </div>
    )
  }
}
