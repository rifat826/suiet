import styles from "./index.module.scss";
import IconDownDouble from '../../../assets/icons/down-double.svg';
import IconQrCode from '../../../assets/icons/qrcode.svg';
import IconTrendUp from '../../../assets/icons/trendup.svg';
import {Link} from "react-router-dom";
import Modal from "../../../components/Modal";
import WaterDropIcon from "../../../components/WaterDropIcon";
import CopyIcon from "../../../components/CopyIcon";
import Typo from "../../../components/Typo";
import TestQrCode from '../../../assets/test-qrcode.png';

const ReceiveButton = () => {
  return (
    <Modal
      title={(
        <div className={'flex items-center'}>
          <span>Receive</span>
          <WaterDropIcon size={'small'} className={'ml-[8px]'} />
        </div>
      )}
      trigger={(
        <div className={styles['receive']}>
          <img src={IconQrCode} className={styles['icon']} />
          <span>Receive</span>
        </div>
      )}
    >
      <div className={'flex flex-col items-center mt-[22px]'}>
        <div className={'flex flex-col items-center'}>
          <img
            src={TestQrCode}
            alt="qr-code"
            className={styles['qr-code']}
          />
          <Typo.Normal className={'mt-[2px]'}>scan to receive</Typo.Normal>
        </div>
        <div className={'flex items-center mt-[21px]'}>
          <Typo.Small>0x2152f01152f01f6152f01f6f6</Typo.Small>
          <CopyIcon className={'ml-[5px]'}></CopyIcon>
        </div>
      </div>
    </Modal>
  )
}

function MainPage() {
  return (
    <div className={styles['main-content']}>
      <div className={styles['balance']}>1.002 SUI</div>
      <div className={styles['address']}>
        <span>0x2152f....01f6</span>   
        <CopyIcon className={'ml-[5px]'} />
      </div>
      <div className={styles['operations']}>
        <div className={styles['airdrop']}>
          <img src={IconDownDouble} className={styles['icon']} />
          Airdrop
        </div>
        <ReceiveButton />
        <Link to={'/send'}>
          <div className={styles['send']}>
            <img src={IconTrendUp} className={styles['icon']} />
            Send
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
