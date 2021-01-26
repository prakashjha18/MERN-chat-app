import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const { user, setUser } = useContext(UserContext)
  const setAsJohn = () => {
    const john = {
      name: 'John',
      email: 'john@email.com',
      password: '123',
      id: '123',
    }
    setUser(john)
  }
  const setAsTom = () => {
    const tom = {
      name: 'Tom',
      email: 'tom@email.com',
      password: '123',
      id: '456',
    }
    setUser(tom)
  }
  return (
    <div>
      <div className='row'>
        <div className='col s12 m6'>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
              <span className='card-title'>
                welcome {user ? user.name : ''}
              </span>

              <div className='row'>
                <form   >
                  <div className='row'>
                    <div className='input-field col s12'>
                      <input
                        placeholder='Enter a room name'
                        id='room'
                        type='text'
                        className='validate'
                      />
                      <label htmlFor='room'>room</label>
                    </div>
                  </div>
                  <button className="btn">Create room</button>
                </form>
              </div>
            </div>
            <div className='card-action'>
              <a href='#' onClick={setAsJohn}>
                set as John
              </a>
              <a href='#' onClick={setAsTom}>
                set as Tom
              </a>
            </div>
          </div>
        </div>
      </div>
      <Link to={'/chat'}>
        <button>go to chat</button>
      </Link>
    </div>
  )
}

export default Home
