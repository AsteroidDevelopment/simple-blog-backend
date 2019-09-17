const express = require('express');

const Pantheons = require('./pantheon-model.js');

const {user_restricted, mod_restricted, admin_restricted} = require('../middleware.js')

const router = express.Router();


router.get('/', (req, res) => {
  Pantheons.find()
  .then(pantheons => {
    res.json(pantheons.map(pantheon => ({
      ...pantheon,
      thumbnail: {
        image_url: pantheon.image_url,
        thumbnail: pantheon.thumbnail,
        image_title: pantheon.image_title,
        image_description: pantheon.image_description,
        image_id: pantheon.image_id
      }
    })));
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get pantheons' });
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  Pantheons.findById(id)
  .then(pantheon => {
    if (pantheon) {
      Pantheons.historyById(id).then(history => {
          Pantheons.influencedById(id).then(influenced => {
              Pantheons.getImages(id).then(images => {
                  Pantheons.getThumbnail(id).then(thumbnail => {
                    Pantheons.getCreatedKinds(id).then(created_kinds => {
                        Pantheons.getUsesKinds(id).then(uses_kinds => {
                          res.json({...pantheon, history, influenced, thumbnail, images, created_kinds, uses_kinds})
                        }).catch(err => {res.status(500).json({ message: 'Failed to get images.' })});
                    }).catch(err => {res.status(500).json({ message: 'Failed to get images.' })});
                  }).catch(err => {res.status(500).json({ message: 'Failed to get images.' })});
              }).catch(err => {res.status(500).json({ message: 'Failed to get images.' })});
          }).catch(err => {res.status(500).json({ message: 'Failed to get influenced.' })});
      }).catch(err => {res.status(500).json({ message: 'Failed to get history' })});
    } else {
      res.status(404).json({ message: 'Could not find pantheon with given id.' })
    }
  })
  .catch(err => {res.status(500).json({ message: 'Failed to get pantheons' });});
});


router.post('/', mod_restricted, (req, res) => {
  const pantheonData = req.body;

  Pantheons.add(pantheonData)
  .then(pantheon => {
    res.status(201).json(pantheon);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new pantheon' });
  });
});


router.post('/history', mod_restricted, (req, res) => {
  const data = req.body;

  Pantheons.addHistory(data)
  .then(history_id => {
    Pantheons.findByHistoryId(history_id)
      .then(editpantheon => {
        res.status(201).json(editpantheon);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to create new history' });
      })
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new history' });
  });
});

router.put('/history/:id', mod_restricted, (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Pantheons.editHistory(data, id)
  .then(pantheon => {
    Pantheons.findByHistoryId(id)
      .then(newpantheon => {
        res.status(201).json(newpantheon);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to create new history' });
      })

  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new history' });
  });
});

router.put('/:id', mod_restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Pantheons.findById(id)
  .then(pantheon => {
    if (pantheon) {
      Pantheons.update(changes, id)
      .then(updatedPantheon => {
        res.json(updatedPantheon);
      });
    } else {
      res.status(404).json({ message: 'Could not find pantheon with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update pantheon' });
  });
});


//First, remove all histories, then delete the pantheon record itself.
router.delete('/:id', mod_restricted, (req, res) => {
  const { id } = req.params;

  Pantheons.removeHistoriesById(id)
  .then(deleted => {
      Pantheons.remove(id)
      .then(deleted => {
        res.send("Success.")
      })
      .catch(err => { res.status(500).json({ message: 'Failed to delete pantheon' }) });
  })
  .catch(err => { res.status(500).json({ message: 'Failed to delete pantheon histories.' }) });
});

//First, remove all histories, then delete the pantheon record itself.
router.delete('/history/:history_id', mod_restricted, (req, res) => {
  const { history_id } = req.params;

  Pantheons.removeHistory(history_id)
  .then(deleted => {
      res.send("Success.")
  })
  .catch(err => { res.status(500).json({ message: 'Failed to delete pantheon histories.' }) });
});

module.exports = router;
