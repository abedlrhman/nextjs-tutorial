import Link from 'next/link'
import { useState } from 'react';
import classes from './MainNavigation.module.css';

function MainNavigation() {

  const [isNavOpen, setIsNavOpen] = useState(false)

  const openHandler = () => setIsNavOpen(!isNavOpen)


  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav className={isNavOpen && classes.open}>
        <div className={`${classes['hamburger-nav']} ${isNavOpen && classes.open}`} onClick={openHandler}></div>
        <ul>
          <li onClick={openHandler}>
            <Link href='/'>All Meetups</Link>
          </li>
          <li onClick={openHandler}>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
