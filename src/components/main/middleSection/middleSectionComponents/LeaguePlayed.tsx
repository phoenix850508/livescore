import LeaguePlayedTop from "./leaguePlayedTop/LeaguePlayedTop";
import MatchItem from "./game/MatchItem";
import styles from "./LeaguePlayed.module.scss";

export default function LeaguePlayed() {
  return (
    <div className={styles.leaguePlayed}>
      <LeaguePlayedTop />
      <MatchItem />
      <MatchItem />
      <MatchItem />
      <MatchItem />
    </div>
  );
}
