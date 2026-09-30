import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/app_theme.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppColors.primaryNavy,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(LucideIcons.truck, color: Colors.white, size: 18),
            ),
            const SizedBox(width: 10),
            const Text(
              'Empty',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: AppColors.textPrimary),
            ),
            const Text(
              'Miles',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: AppColors.brandAmber),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(LucideIcons.bell, color: AppColors.textPrimary),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Active Corridor Capacity Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.primaryNavy,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.brandAmber,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Text(
                          '8.0T AVAILABLE SPACE',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                      const Text(
                        'Tata 407 (MH 12 AB 1234)',
                        style: TextStyle(color: Colors.white70, fontSize: 12),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('ORIGIN', style: TextStyle(color: Colors.white60, fontSize: 10, fontWeight: FontWeight.w700)),
                          SizedBox(height: 2),
                          Text('Ahmedabad', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700)),
                        ],
                      ),
                      Icon(LucideIcons.arrowRight, color: AppColors.brandAmber, size: 20),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text('DESTINATION', style: TextStyle(color: Colors.white60, fontSize: 10, fontWeight: FontWeight.w700)),
                          SizedBox(height: 2),
                          Text('Surat', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.brandAmber,
                      foregroundColor: Colors.white,
                    ),
                    onPressed: () => context.push('/hunt'),
                    icon: const Icon(LucideIcons.search, size: 18),
                    label: const Text('Cargo Hunt (4 Matches Nearby)'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Active In-Transit Trip Card
            const Text(
              'ACTIVE DISPATCH',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 0.5, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.info.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Row(
                          children: [
                            Icon(LucideIcons.navigation, size: 12, color: AppColors.info),
                            SizedBox(width: 4),
                            Text('IN TRANSIT', style: TextStyle(color: AppColors.info, fontSize: 11, fontWeight: FontWeight.w700)),
                          ],
                        ),
                      ),
                      const Text(
                        'TR-9001',
                        style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.textPrimary),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    '6.0T General Goods (Textiles)',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.textPrimary),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'NH 48 near Bharuch Bypass • ETA 85 mins',
                    style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: AppColors.border),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                          onPressed: () => context.push('/trip/TR-9001'),
                          child: const Text('Live GPS Radar'),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primaryNavy,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                          onPressed: () => context.push('/pod/TR-9001'),
                          child: const Text('Digital POD'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Quick Hub Operations
            const Text(
              'LOGISTICS OPERATIONS',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 0.5, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                _buildQuickAction(
                  context,
                  title: 'Cargo Hunt',
                  subtitle: 'Fill empty space',
                  icon: LucideIcons.search,
                  color: AppColors.brandAmber,
                  onTap: () => context.push('/hunt'),
                ),
                const SizedBox(width: 12),
                _buildQuickAction(
                  context,
                  title: 'Escrow Wallet',
                  subtitle: '₹7,200 available',
                  icon: LucideIcons.wallet,
                  color: AppColors.success,
                  onTap: () => context.push('/wallet'),
                ),
              ],
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedItemColor: AppColors.brandAmber,
        unselectedItemColor: AppColors.textSecondary,
        type: BottomNavigationBarType.fixed,
        onTap: (index) {
          setState(() => _currentIndex = index);
          if (index == 1) context.push('/hunt');
          if (index == 2) context.push('/trip/TR-9001');
          if (index == 3) context.push('/wallet');
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(LucideIcons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.compass), label: 'Hunt'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.truck), label: 'Trips'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.wallet), label: 'Wallet'),
        ],
      ),
    );
  }

  Widget _buildQuickAction(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: color, size: 20),
              ),
              const SizedBox(height: 12),
              Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
              const SizedBox(height: 2),
              Text(subtitle, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
            ],
          ),
        ),
      ),
    );
  }
}
