import { withTranslation } from '../../../i18n';

const Rewards = ({ t }) => {
  return (
    <div>
      <h3 className="rewards-title">{t('title')}</h3>
      <h5 className="rewards-point">{t('point')}</h5>

      <div className="voucher-container">
        <div>
          <h4>{t('hotel')}</h4>
          <img
            className="voucher"
            src="https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/40/92/40920_v2.jpeg"
            alt=""
          />
          <p className="voucher-desc">{t('hotel-desc')}</p>
        </div>

        <div>
          <h4>{t('cash')}</h4>

          <img
            className="voucher"
            src="https://i.imgur.com/5Qa27hn.jpg"
            alt=""
          />
          <p className="voucher-desc">{t('cash-desc')}</p>
        </div>
      </div>
    </div>
  );
};

export default withTranslation('reward')(Rewards);
