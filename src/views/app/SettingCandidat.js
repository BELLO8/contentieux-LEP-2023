import React from 'react'
import CardCongratulations from '../Components/CardCongratulations'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import ModalForm from '../Components/ModalForm'
import UsersList from '../Components/Table'

export default function SettingCandidat() {
  return (
    <div>
      <ModalForm/>
      <UsersList />
    </div>
  )
}
