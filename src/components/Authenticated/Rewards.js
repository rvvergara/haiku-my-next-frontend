const Rewards = () => {
  return (
    <div>
      <h3 className="rewards-title">Earn Rewards by Inviting your friends</h3>
      <h5 className="rewards-point"> Your points: 10</h5>

      <div className="voucher-container">
        <div>
          <h4>Hotel Voucher</h4>
          <img
            className="voucher"
            src="https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/40/92/40920_v2.jpeg"
            alt=""
          />
          <p className="voucher-desc">
            You can redeem this hotel coupon for 300 points
          </p>
        </div>

        <div>
          <h4>Cash Voucher</h4>

          <img
            className="voucher"
            src="https://i.imgur.com/5Qa27hn.jpg"
            alt=""
          />
          <p className="voucher-desc">
            You can redeem this voucher coupon for 100 points
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
