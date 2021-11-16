import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
import React from 'react'
import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails({meetupData}) {
	const {title, image, address, description} = meetupData
	return (
		<> 
		<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
		</Head>
		<MeetupDetail 
			image={image}
			title={title}
			address={address}
			description={description}
		/>
		</>
	)
}

export async function getStaticPaths () {

	const client = await MongoClient.connect('mongodb+srv://abdulrahman:u9FU3rKIZxVGSW68@nextjslearning.uvidw.mongodb.net/meetupsData?retryWrites=true&w=majority')
	const db = client.db()

	const meetupsCollection = db.collection('meetups')

	const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()

	client.close()
	
	return {
		fallback: true ,
		paths: meetups.map(meetup => ({params: { meetupId: meetup._id.toString()}}))
	}
}

export async function getStaticProps (context) {
	// send an api request
	const meetupId = context.params.meetupId

	const client = await MongoClient.connect('mongodb+srv://abdulrahman:u9FU3rKIZxVGSW68@nextjslearning.uvidw.mongodb.net/meetupsData?retryWrites=true&w=majority')
	const db = client.db()

	const meetupsCollection = db.collection('meetups')

	const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})

	client.close()
	

	return {
		props: {
			meetupData : {
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
				id : selectedMeetup._id.toString(),
			},
		}
	}
}

export default MeetupDetails
