import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Hotel from './shared/hotel';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
import hotelsService from '../../../services/hotels';
import bindHotelsToRep from '../../../functions/bindHotelsToRep';
import { useParams } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './addHotel.module.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
const token = parseCookie('tgs-token');
// console.log(token);
const Test = (props) => {
  const classes = useStyles();
  const [hotels, setHotels] = useState([]);
  const [err, setErr] = useState(null);
  const [repName, setRepName] = useState({ firstName: null, secondName: null });
  const [expanded, setExpanded] = useState(false);
  const { repId } = useParams();
  const history = useHistory();
  //   const [hotelsRep, setHotelsRep] = useState([]);
  //   const [allHotels, setAllHotels] = useState([]);
  const rep = 0;
  const handleChange = (resort) => (event, isExpanded) => {
    setExpanded(isExpanded ? resort : false);
  };
  useEffect(() => {
    // const allHotels = await hotelsService.listAll();
    // console.warn(allHotels);
    Promise.all([
      hotelsService.listAll(token),
      repsService.getHotelsByRep(repId, token),
      repsService.details(repId, token),
    ]).then(([allHotels, repsHotel, repsInfo]) => {
      if (allHotels.status & repsHotel.status) {
        //   setAllHotels(allHotels.hotels);
        //   setHotelsRep(repsHotel.hotels);
        // bindHotelsToRep(allHotels.hotels, repsHotel.hotels, setHotels);
        checked(allHotels.hotels, repsHotel.hotels);
        const { firstName, familyName } = repsInfo.result;
        // setRepName(repsInfo.result.firstName + ' ' + repsInfo.result.familyName);
        setRepName({ ...repName, firstName, familyName });
        return;
      }
      setErr(repsHotel.msg);
    });
  }, [token]);

  //sort, reduce to group array and ass flag checked
  function checked(ha, hr) {
    const hotelsRepArray = [...hr].map((a) => a._id);
    const checkedRepHotels = [...ha]
      .sort((a, b) => {
        if (a.resortId.name === b.resortId.name) {
          return a.name.localeCompare(b.name.localeCompare);
        } else {
          return a.resortId.name.localeCompare(b.resortId.name);
        }
      })
      .map((a) => {
        if (hotelsRepArray.includes(a._id)) {
          return { ...a, checked: true };
        } else {
          return { ...a, checked: false };
        }
      })
      .reduce((acc, curr) => {
        acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr];
        return acc;
      }, {});
    setHotels(checkedRepHotels);
    console.log(checkedRepHotels);
  }
  const updHtls = (resort, tmp) => {
    const temp = { ...hotels };
    temp[resort] = [...tmp]; //masiva e bil problema
    setHotels(temp);
  };
  const countChecked = (arr) => {
    const checked = arr.filter((a) => a['checked'] === true).length;
    const all = arr.length;
    return { checked, all };
  };
  const submitForm = (e) => {
    e.preventDefault();
    let tmp = [...Object.values(hotels)]
      .map((a) =>
        a.map((b) => {
          if (b.checked) {
            return b._id;
          }
        })
      )
      .reduce((acc, curr) => acc.concat(curr), [])
      .filter((a) => a !== undefined);
    console.log(tmp);
    repsService.repUpdate({ repId, hotels: tmp }, token).then((a) => {
      if (a.status) {
        console.log('Hotels are updated');
        history.push('/admin/reps/list');
        return;
      }
      console.log(a.msg);
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2>
        List of hotels assigned to {repName.firstName} {repName.familyName}
      </h2>
      {/* <form onSubmit={submitForm}>
        {Object.entries(hotels).map((data) => {
          const resort = data[0];
          const hotelsInResort = data[1];
          //   console.log(resort);
          return (
            <div key={resort}>
              <div>
                {resort.toUpperCase()} - {countChecked(hotelsInResort).checked} from {countChecked(hotelsInResort).all}{' '}
                hotels selected
              </div>

              <Hotel hotels={hotelsInResort} updHtls={(resort, t) => updHtls(resort, t)} resort={resort} />
            </div>
          );
        })}
        <button type="submit">Add hotels</button>
        <button onClick={history.goBack}>back</button>
      </form> */}
      {hotels.length === 0 && <div>Loading ....</div>}
      {hotels.length !== 0 && (
        <div className={styles.formwrap}>
          <div className={styles.stickyButtton}>
            <Button
              variant="contained"
              color="default"
              onClick={history.goBack}
              startIcon={[<ArrowBackIosIcon />, <ArrowBackIosIcon />]}>
              back
            </Button>
            {/* <button onClick={history.goBack}>back</button> */}
          </div>
          <form onSubmit={submitForm}>
            {Object.entries(hotels).map((data, i) => {
              const resort = data[0];
              const hotelsInResort = data[1];
              //   console.log(resort);
              return (
                // <div key={resort}>
                //   <div>
                //     <b>{resort.toUpperCase()}</b> - {countChecked(hotelsInResort).checked} from{' '}
                //     {countChecked(hotelsInResort).all} hotels selected
                //   </div>

                //   <Hotel hotels={hotelsInResort} updHtls={(resort, t) => updHtls(resort, t)} resort={resort} />
                // </div>
                <Accordion key={i} expanded={expanded === resort} onChange={handleChange(resort)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Typography component={'span'} className={classes.heading}>
                      {resort.toUpperCase()}
                    </Typography>
                    <Typography component={'span'} className={classes.secondaryHeading}>
                      {countChecked(hotelsInResort).checked} from {countChecked(hotelsInResort).all} hotels selected
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography component={'span'}>
                      <Hotel hotels={hotelsInResort} updHtls={(resort, t) => updHtls(resort, t)} resort={resort} />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </form>

          <div className={styles.stickyButtton}>
            <button type="submit">Add hotels</button>
          </div>
        </div>
      )}
      {!!err && <div>{err.message}</div>}
    </div>
  );
};

export default Test;
