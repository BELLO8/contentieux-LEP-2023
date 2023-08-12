import classnames from 'classnames'
import { Star } from 'react-feather'
import Nouislider from 'nouislider-react'

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label } from 'reactstrap'

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'

const Sidebar = props => {
  // ** Props
  const { sidebarOpen } = props

  // ** Array of categories
  const categories = [
    {
      id: 'appliances',
      title: 'Appliances',
      defaultChecked: true
    },
    {
      id: 'audio',
      title: 'Audio'
    },
    {
      id: 'camera-camcorders',
      title: 'Camera & Camcorders'
    },
    {
      id: 'car-electronics',
      title: 'Car Electronics & Gps'
    },
    {
      id: 'cellphones',
      title: 'Cell Phones'
    },
    {
      id: 'computers',
      title: 'Computers & Tablets'
    },
    {
      id: 'health-fitness-beauty',
      title: 'Health, Fitness & Beauty'
    },
    {
      id: 'office-school',
      title: 'Office & School Supplies'
    },
    {
      id: 'tv-home-theater',
      title: 'TV & Home Theater'
    },
    {
      id: 'video-games',
      title: 'Video Games'
    }
  ]

  // ** Array of brands
  const brands = [
    {
      title: 'Insignia™',
      total: 746
    },
    {
      title: 'Samsung',
      total: 633,
      checked: true
    },
    {
      title: 'Metra',
      total: 591
    },
    {
      title: 'HP',
      total: 530
    },
    {
      title: 'Apple',
      total: 422,
      checked: true
    },
    {
      title: 'GE',
      total: 394
    },
    {
      title: 'Sony',
      total: 350
    },
    {
      title: 'Incipio',
      total: 320
    },
    {
      title: 'KitchenAid',
      total: 318
    },
    {
      title: 'Whirlpool',
      total: 298
    }
  ]

  // ** Array of ratings
  const ratings = [
    {
      ratings: 4,
      total: 160
    },
    {
      ratings: 3,
      total: 176
    },
    {
      ratings: 2,
      total: 291
    },
    {
      ratings: 1,
      total: 190
    }
  ]

  return (
    <div className='sidebar-detached sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
              <div>
                <h6 className='filter-title'>Lieu de vote</h6>
                <ul className='list-unstyled categories-list'>
                  {categories.map(category => {
                    return (
                      <li key={category.id}>
                        <div className='form-check'>
                          <Input
                            type='radio'
                            id={category.id}
                            name='category-radio'
                            defaultChecked={category.defaultChecked}
                          />
                          <Label className='form-check-label' for={category.id}>
                            {category.title}
                          </Label>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <h6 className='filter-title'>Brands</h6>
                <ul className='list-unstyled brand-list'>
                  {brands.map(brand => {
                    return (
                      <li key={brand.title}>
                        <div className='form-check'>
                          <Input type='checkbox' id={brand.title} defaultChecked={brand.checked} />
                          <Label className='form-check-label' for={brand.title}>
                            {brand.title}
                          </Label>
                        </div>
                        <span>{brand.total}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div id='ratings'>
                <h6 className='filter-title'>Ratings</h6>
                {ratings.map(item => {
                  return (
                    <div key={item.total} className='ratings-list'>
                      <a href='/' onClick={e => e.preventDefault()}>
                        <ul className='unstyled-list list-inline'>
                          {new Array(5).fill().map((listItem, index) => {
                            return (
                              <li key={index} className='ratings-list-item me-25'>
                                <Star
                                  className={classnames({
                                    'filled-star': index + 1 <= item.ratings,
                                    'unfilled-star': index + 1 > item.ratings
                                  })}
                                />
                              </li>
                            )
                          })}
                          <li>& up</li>
                        </ul>
                      </a>
                      <div className='stars-received'>{item.total}</div>
                    </div>
                  )
                })}
              </div>
              <div id='clear-filters'>
                <Button color='primary' block>
                  Clear All Filters
                </Button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
