/* eslint-disable */
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign, UserPlus, Users, Percent, Archive, MapPin } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { nombreRepresentant } from '../../redux/store/Representant'
import { getUserData } from '../../utility/Utils'
import { nombreBV, nombreLV } from '../../redux/store/Election'

const StatsCard = ({ cols }) => {

  const dispatch = useDispatch()
  const user = getUserData()
  const nbreRep = useSelector((state) => state.representant.nombreRepresentant)
  const nbreBV = useSelector((state) => state.election.nbrBv)
  const nbreLV = useSelector((state) => state.election.nbrLv)

  useEffect( () => {
    dispatch(nombreRepresentant(user.id_candidat))
    dispatch(nombreBV({idcircons: user.id_circons, type_election: user.id_type_election}))
    dispatch(nombreLV({idcircons: user.id_circons, type_election: user.id_type_election}))
  },[dispatch])

  const data = [
    {
      title: nbreLV,
      subtitle: 'Lieux de vote',
      color: 'light-primary',
      icon: <MapPin size={24} />
    },
    {
      title: nbreBV,
      subtitle: 'Bureaux de vote',
      color: 'light-info',
      icon: <Archive size={24} />
    },
    {
      title: nbreRep,
      subtitle: 'Représentants',
      color: 'light-danger',
      icon: <Users size={24} />
    },
    {
      title: '',
      subtitle: 'Nombre candidats',
      color: 'light-success',
      icon: <User size={24} />
    }
  ]


  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Tableau de bord</CardTitle>
        <CardText className='card-text  me-25 mb-0'><h3 className="text-primary">{user.lib_type_election}</h3></CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
