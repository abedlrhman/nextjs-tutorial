import Head from 'next/head'
import { useRouter } from 'next/router'
import NewMeetupForm from '../components/meetups/NewMeetupForm'

function NewMeetupPage() {

		const router = useRouter()
	
	async function AddMeetupHandler (enteredMeetupData) {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type' : 'application/json'
			}
		})

		const data = await response.json()
		
		console.log(data)

		router.push('/')
		
	}
	
	return (
		<>
			<Head>
				<title>add a new meetup</title>
				<meta name='description' content='add your own amazing meetups' />
			</Head>
			<NewMeetupForm onAddMeetup={AddMeetupHandler} />
		</>
	)
}

export default NewMeetupPage
