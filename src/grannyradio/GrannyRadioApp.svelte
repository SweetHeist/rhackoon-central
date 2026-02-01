<script>
    export let state;
</script>
  <style>
    header {
      background: #ffffff;
      border-bottom: 1px solid #ccc;
      padding: 16px 24px;
      color: #222;
    }

    header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: bold;
    }

    .container {
      max-width: 1100px;
      margin: 24px auto;
      background: #ffffff;
      border: 1px solid #ccc;
      display: flex;
      color: #222;
    }

    .main {
      flex: 1;
      border-right: 1px solid #ddd;
      color: #222;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      width: 260px;
      background: #fafafa;
      padding: 16px;
    }

    section {
      padding: 20px 24px;
      border-bottom: 1px solid #ddd;
    }

    section:last-child {
      border-bottom: none;
    }

    h2 {
      font-size: 18px;
      margin-top: 0;
      font-weight: normal;
    }

    p {
      margin: 8px 0 12px;
    }

    ul {
      margin: 8px 0 12px 20px;
    }

    .image-placeholder {
      margin: 12px 0;
      border: 1px solid #999;
      background: #eee;
      color: #666;
      text-align: center;
      /* padding: 60px 20px; */
      padding: 20px;
      font-size: 14px;
    }

    .note {
      font-size: 13px;
      color: #555;
    }

    /* Ads */
    .ad {
      border: 1px solid #bbb;
      background: #f0f0f0;
      padding: 14px;
      margin-bottom: 16px;
      font-size: 13px;
      color: #333;
    }

    .ad-img {
      width: 300px;        
      max-width: 100%;    
      height: auto;  
    }

    .ad strong {
      display: block;
      margin-bottom: 6px;
      font-weight: bold;
    }

    .morse-img {
        width: 100%;
    }

    footer {
      background: #fafafa;
      border-top: 1px solid #ccc;
      padding: 16px 24px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      color: #222;
    }

    .promo {
      font-weight: bold;
    }

    .cta {
      border: 1px solid #333;
      padding: 6px 10px;
      text-decoration: none;
      color: #000;
      background: #fff;
    }

    @media (max-width: 900px) {
      .container {
        flex-direction: column;
      }
      .sidebar {
        width: auto;
        border-top: 1px solid #ddd;
      }
      .main {
        border-right: none;
      }
    }
  </style>


  <header>
    <h1>GrannyRadio — Support & Documentation</h1>
  </header>

  <div class="container">

    <div class="main">

      <section>
        <h2>Understanding Common Radio Signals</h2>
        <p>
          Modern GrannyRadio radios may emit a variety of tones, beeps, and static
          patterns during normal operation. These sounds are informational and
          should not immediately be considered a malfunction.
        </p>

        <ul>
          <li><strong>Short beeps:</strong> Channel scanning or environmental interference.</li>
          <li><strong>Long tone:</strong> Signal lock attempt.</li>
          <li><strong>Rapid static:</strong> Incoming transmission, partially obscured.</li>
          <li><strong>Silence:</strong> Radio functioning as intended.</li>
        </ul>

        <div class="image-placeholder">
          <img src="grannyRadio/morse_own.jpg" class="morse-img"/>
        </div>

        <p class="note">
          Note: Interpretation may vary depending on region, atmospheric conditions,
          and unknown factors.
        </p>
      </section>

      <section>
        <h2>Additional Training Resources</h2>
        <p>
          For users who require a deeper understanding of radio signal patterns,
          GrannyRadio offers optional educational materials.
        </p>

        <ul>
          <li>Distinguishing noise from intentional signals</li>
          <li>Recognizing recurring transmission motifs</li>
          <li>Identifying signals that may warrant further attention</li>
        </ul>
      </section>

    </div>

    <aside class="sidebar">

      <div class="ad">
        <strong>Sponsored</strong>
       <img class="ad-img" src="grannyRadio/ad_telegraph.jpg" />
      </div>

      <div class="ad">
        <strong>Offer</strong>
        <img class="ad-img" src="grannyRadio/ad_oatmilk.jpg" />
      </div>

      <div class="ad">
        <strong>Did You Know?</strong>
          <img class="ad-img" src="grannyRadio/ad_g2g.jpg" />
      </div>

    </aside>

  </div>

  <footer>
    <div class="promo">
      30% off Radio Sound Deciphering Course
    </div>
    <a class="cta" href="#">
      Learn More
    </a>
  </footer>


