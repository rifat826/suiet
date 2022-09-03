import styles from './index.module.scss';
import Wallet from './wallet';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Network from './network';
import Security from './security';
import { useDispatch, useSelector } from 'react-redux';
import { resetAppContext } from '../../store/app-context';
import { AppDispatch, RootState } from '../../store';
import { useAccount } from '../../hooks/useAccount';
import CopyIcon from '../../components/CopyIcon';
import toast from '../../components/toast';
import { addressEllipsis } from '../../utils/format';
import { coreApi } from '@suiet/core';
import { avatarMap } from '../../constants/avatar';
import { isDev } from '../../utils/env';
import Address from '../../components/Address';

function SettingPage() {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.appContext.token);
  const dispatch = useDispatch<AppDispatch>();
  const { context, wallet } = useSelector((state: RootState) => ({
    context: state.appContext,
    wallet: state.wallet,
  }));
  const { account } = useAccount(context.accountId);

  async function handleResetApp() {
    await coreApi.resetAppData(token);
    await dispatch(resetAppContext()).unwrap();
  }

  return (
    <div className={styles['settings-container']}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className={styles['wallet-avatar']}
                style={{
                  backgroundImage: `url('${avatarMap[wallet.avatar]}')`,
                }}
              ></div>
              <div className={styles['wallet-name']}>{wallet.name}</div>
              <Address value={account.address} className={styles['address']} />
              <div
                onClick={() => {
                  navigate('wallet', {
                    state: {
                      hideApplayout: true,
                    },
                  });
                }}
                className={styles['settings-item']}
              >
                <span className={styles['icon-wallet']}></span>Wallet
                <span className={styles['icon-right-arrow']} />
              </div>
              <div
                onClick={() => {
                  navigate('network', {
                    state: {
                      hideApplayout: true,
                    },
                  });
                }}
                className={styles['settings-item']}
              >
                <span className={styles['icon-network']}></span>Network
                <span className={styles['icon-right-arrow']} />
              </div>
              <div
                onClick={() => {
                  navigate('security', {
                    state: {
                      hideApplayout: true,
                    },
                  });
                }}
                className={styles['settings-item']}
              >
                <span className={styles['icon-security']}></span>Security
                <span className={styles['icon-right-arrow']} />
              </div>
              {/* dev use */}
              {isDev && (
                <div
                  onClick={async () => await handleResetApp()}
                  className={styles['settings-item']}
                >
                  <span className={styles['icon-security']}></span>Reset App
                </div>
              )}
              <div className={styles['app-version']}>version v0.0.1</div>
            </>
          }
        />
        <Route path="wallet" element={<Wallet />} />
        <Route path="network" element={<Network />} />
        <Route path="security" element={<Security />} />
      </Routes>
    </div>
  );
}

export default SettingPage;
