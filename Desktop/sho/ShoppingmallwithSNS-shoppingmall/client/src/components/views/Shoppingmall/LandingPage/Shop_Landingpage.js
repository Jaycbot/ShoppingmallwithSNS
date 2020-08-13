import React from 'react'
import ImageBanner from './Sections/ImageBanner'
import HotCards from './Sections/HotCards';
import ReviewCards from './Sections/ReviewCards';
import WeeklyIssue from './Sections/WeeklyIssue';

function LandingPage() {


    return (
        <div>
            <div>
                <ImageBanner /> 
            </div>
                <HotCards />
            <br/>
                <ReviewCards />
            <br/>
                <WeeklyIssue />
        </div>
    )
}

export default LandingPage
