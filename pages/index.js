import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta name='description' content='browse a huge list of highly active React meetups!' />
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	)
}

export async function getStaticProps() {
	// fetch the data from the api

	const client = await MongoClient.connect('mongodb+srv://abdulrahman:u9FU3rKIZxVGSW68@nextjslearning.uvidw.mongodb.net/meetupsData?retryWrites=true&w=majority')
	const db = client.db()

	const meetupsCollection = db.collection('meetups')

	const meetups = await meetupsCollection.find().toArray()

	client.close()

	return {
		props : {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString()
			})),
		},
		revalidate: 1,
	}
}

export default HomePage

