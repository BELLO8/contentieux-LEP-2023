import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '../../@core/components/breadcrumbs'
import { getAllEtapeBv } from '../../redux/store/Election'
import RealTimeVoteList from '../Components/RealTimeVoteList'
import { Tabs } from '../Components/Tabs'

export const Contentieux = () => {
    const [active, setActive] = useState({
        id: "1",
        libelle: "Ouverture du bureau de vote"
    })

    const [type, setType] = useState(1)
    const dispatch = useDispatch()
    const etape = useSelector((state) => state.election.etape)

    useEffect(() => {
        dispatch(getAllEtapeBv())
    }, [dispatch])

    return (
        <>
            <BreadCrumbs
                title="Contentieux"
                url="/"
                data={[]}
            />
            {/* <p className='text-orange-600'>
                Affiche tout les problème sur le parcours du début jusqu'à résultat CEI
            </p> */}
            <div className='flex gap-2'>
                <button onClick={() => {
                    setType(1)
                }} className='btn btn-danger'> Affichage par lieu de vote </button>
                <button onClick={() => {
                    setType(2)
                }} className='btn btn-dark'> Affichage par etape du scrutin </button>
                <button onClick={() => {
                    setType(3)
                }} className='btn btn-primary'>Differentiel de proclamation</button>
            </div>
            {
                type === 1 ? <>
                    <p className='mt-2'>Affichage par lieu de vote</p>
                    <RealTimeVoteList />
                </> : type === 2 ? <>
                    <p className='mt-2'>Affichage par etape du scrutin</p>

                    <Tabs setActive={setActive} active={active} tabsData={etape} />
                    <RealTimeVoteList />
                </> : type === 3 ? <>
                    <RealTimeVoteList />

                </> : <></>
            }


        </>
    )
}
