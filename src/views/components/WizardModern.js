// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import PayementInfo from './Payment'
import CandidantInfo from './CandidantInfo'
import Identification from './Identification'

// ** Icons Imports
import { FileText, User, CreditCard } from 'react-feather'

const WizardModern = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    
    {
      id: 'identification',
      title: 'Identification',
      subtitle: 'Identification d\'un candidant',
      icon: <User size={18} />,
      content: <Identification stepper={stepper} />
    },
    {
      id: 'candidat',
      title: 'Candidat',
      subtitle: 'Information sur le candidat',
      icon: <FileText size={18} />,
      content: <CandidantInfo stepper={stepper} />
    }, 
    {
      id: 'paiement',
      title: 'Paiement',
      subtitle: 'Passer au paiement',
      icon: <CreditCard size={18} />,
      content: <PayementInfo stepper={stepper} />
    }
  ]

  return (
    <div className='modern-horizontal-wizard'>
      <Wizard
        ref={ref}
        steps={steps}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default WizardModern
