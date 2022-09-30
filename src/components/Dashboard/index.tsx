import { Summany } from '../Summany'
import { TransactionsTable } from '../TransactionsTable'
import { Container } from './styles'

export function Dashboard() {
  return (
    <Container>
      <Summany />
      <TransactionsTable />
    </Container>
  )
}
