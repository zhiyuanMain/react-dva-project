import { Link } from 'dva/router'
import React from 'react'
import { Block } from 'src/components'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import './SwiperRow.less'

const imgList = ['gbzfjzzdzl', 'ylszcxdnyfzzczl', 'wzgzbb']
interface SwiperRowProps {
  prefixCls?: string
}
class SwiperRow extends React.Component<SwiperRowProps, {}> {
  private _swiper: any
  constructor(props: SwiperRowProps | Readonly<SwiperRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-swiperrow'
  }

  renderContent = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__img`
    return (
      <div className={wrapCls}>
        <Swiper
          width={1200}
          slidesPerView={3}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => (this._swiper = swiper)}>
          {imgList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to={`/list/${item}`}>
                  <img src={require(`src/assets/img/banner-${item}.png`)} />
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <span
          className="swiper-button-prev"
          onClick={() => {
            this._swiper.slidePrev()
          }}></span>
        <span
          className="swiper-button-next"
          onClick={() => {
            this._swiper.slideNext()
          }}></span>
      </div>
    )
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>{this.renderContent()}</Block.Center>
      </div>
    )
  }
}

export default SwiperRow
