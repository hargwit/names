import React, { useState } from 'react'
import { Button, Modal, Tabs, Tab } from 'react-bootstrap'

const styles = {
  root: {
    height: '0px',
  },
  modalButton: {
    position: 'absolute',
    right: '4px',
    top: '4px',
    paddingTop: '4px',
    paddingBottom: '4px',
    border: 'none',
  },
  tabHeader: {
    marginTop: '12px',
    marginBottom: '12px',
  },
}

const GameRules = () => {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <>
      <div style={styles.root}>
        <Button
          onClick={openModal}
          variant='outline-primary'
          style={styles.modalButton}
        >
          View rules
        </Button>
      </div>
      <Modal show={open} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Game rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey='round-1' id='uncontrolled-tab-example'>
            <Tab eventKey='round-1' title='Round 1'>
              <h4 style={styles.tabHeader}>Round 1 - Describe</h4>
              <p>
                <strong>Describe</strong> as many names as possible in 30
                seconds to your team mates. You can say anything you like
                except:
              </p>
              <ul>
                <li>The name, or any part of it</li>
                <li>"Rhymes with..."</li>
                <li>"Starts with..."</li>
              </ul>
              <p>
                <strong>No acting</strong> is allowed in this round.
              </p>
            </Tab>
            <Tab eventKey='round-2' title='Round 2'>
              <h4 style={styles.tabHeader}>Round 2 - One word</h4>
              <p>
                The same names are in the hat but this round you can only say{' '}
                <strong>one word</strong> to describe them. You can say any word
                but some restrictions:
              </p>
              <ul>
                <li>You cannot say any part of the name</li>
                <li>"Prime minister" is two words</li>
                <li>
                  You must say the same word when you return to a pass from
                  earlier in your turn
                </li>
              </ul>
              <p>
                <strong>No acting</strong> is allowed in this round.
              </p>
            </Tab>
            <Tab eventKey='round-3' title='Round 3'>
              <h4 style={styles.tabHeader}>Round 3 - Act it out</h4>
              <p>
                The same names are in the hat, this round you{' '}
                <strong>act them out</strong> to your teams mates. You can act
                however you like but some restrictions:
              </p>
              <ul>
                <li>No speaking</li>
                <li>No sound effects</li>
                <li>No mouthing any words</li>
              </ul>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  )
}

export { GameRules }
